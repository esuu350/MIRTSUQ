import os
import logging
import psycopg2
from psycopg2.extras import RealDictCursor
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import (
    ApplicationBuilder, CommandHandler, CallbackQueryHandler, ContextTypes
)

# ================= CONFIG (Integrated Env Variables) =================
TOKEN = "8794811481:AAEmsU2mkLN7JOxjr3dh-iQt-AzgBRkY0es"
CHANNEL = "@mirtsuq"
ADMIN_ID = 8122687721
BOT_USERNAME = "mirtsuqbot"

DB_HOST = "aws-1-eu-central-1.pooler.supabase.com"
DB_NAME = "postgres"
DB_USER = "postgres.slljeiwvoznnbemvbfcs"
DB_PASSWORD = "E5@y@55ilt@n"
DB_PORT = "6543"

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ================= DB CONNECTION =================
def get_db():
    try:
        return psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            port=DB_PORT,
            sslmode="require",
            cursor_factory=RealDictCursor
        )
    except Exception as e:
        logger.error(f"❌ DB CONNECTION ERROR: {e}")
        return None

def safe_execute(query, params=(), fetch=False):
    conn = get_db()
    if not conn:
        return None
    try:
        with conn:
            with conn.cursor() as cur:
                cur.execute(query, params)
                if fetch:
                    return cur.fetchall()
    except Exception as e:
        logger.error(f"⚠️ Query error: {e}")
    finally:
        conn.close()

# ================= TABLE SETUP =================
def setup_tables():
    logger.info("🛠 Setting up database tables...")
    safe_execute("""
    CREATE TABLE IF NOT EXISTS users (
        user_id BIGINT PRIMARY KEY,
        username TEXT,
        first_name TEXT
    );

    CREATE TABLE IF NOT EXISTS referrals (
        id BIGSERIAL PRIMARY KEY,
        referrer_id BIGINT,
        invited_user_id BIGINT,
        verified BOOLEAN DEFAULT FALSE,
        UNIQUE(referrer_id, invited_user_id)
    );
    """)

# ================= DATABASE HELPERS =================
def save_user(user):
    safe_execute("""
        INSERT INTO users (user_id, username, first_name)
        VALUES (%s, %s, %s)
        ON CONFLICT (user_id) DO UPDATE
        SET username = EXCLUDED.username,
            first_name = EXCLUDED.first_name
    """, (user.id, user.username or "", user.first_name or ""))

def record_referral(ref, user_id):
    # Records the intent to refer (before verification)
    safe_execute("""
        INSERT INTO referrals (referrer_id, invited_user_id)
        VALUES (%s, %s)
        ON CONFLICT DO NOTHING
    """, (ref, user_id))

def verify_and_get_count(user_id):
    # First, mark the user as verified because they joined the channel
    safe_execute(
        "UPDATE referrals SET verified=TRUE WHERE invited_user_id=%s",
        (user_id,)
    )
    # Then, return how many people THIS user has successfully referred
    result = safe_execute(
        "SELECT COUNT(*) AS cnt FROM referrals WHERE referrer_id=%s AND verified=TRUE",
        (user_id,),
        fetch=True
    )
    return result[0]["cnt"] if result else 0

# ================= BOT HANDLERS =================
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.effective_user
    save_user(user)

    # Check if user came through a referral link
    if context.args:
        ref = context.args[0]
        if ref.isdigit() and int(ref) != user.id:
            record_referral(int(ref), user.id)

    keyboard = [
        [InlineKeyboardButton("📢 Join Channel", url=f"https://t.me/{CHANNEL.replace('@','')}")],
        [InlineKeyboardButton("✅ Check Join", callback_data="check")]
    ]

    await update.message.reply_text(
        f"👋 ሰላም {user.first_name}\n\nወደ ሪፈራል ቦት እንኳን መጡ! "
        f"ለመቀጠል እባክዎ ቻናላችንን ይቀላቀሉ 👇",
        reply_markup=InlineKeyboardMarkup(keyboard)
    )

async def check(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    user = query.from_user
    
    try:
        member = await context.bot.get_chat_member(CHANNEL, user.id)
        
        if member.status not in ["member", "administrator", "creator"]:
            await query.answer("❌ እባክዎ አስቀድመው ቻናሉን ይቀላቀሉ!", show_alert=True)
            return

        # User is in channel: Verify them and get their referral count
        ref_count = verify_and_get_count(user.id)
        link = f"https://t.me/{BOT_USERNAME}?start={user.id}"

        await query.answer("✅ ተረጋግጧል!")
        await query.edit_message_text(
            f"✅ እንኳን ደህና መጡ!\n\n"
            f"👥 የጋበዙት ሰው ብዛት: {ref_count}\n\n"
            f"የእርስዎ መጋበዣ ሊንክ 👇\n`{link}`",
            parse_mode="Markdown",
            reply_markup=InlineKeyboardMarkup([
                [InlineKeyboardButton("📤 Share Link", url=f"https://t.me/share/url?url={link}")]
            ])
        )

    except Exception as e:
        logger.error(f"Check Error: {e}")
        await query.answer("❌ ስህተት ተፈጥሯል! ቦቱ በቻናሉ Admin መሆኑን ያረጋግጡ።", show_alert=True)

# ================= MAIN RUNNER =================
if __name__ == "__main__":
    # Ensure tables exist before bot starts
    setup_tables()

    app = ApplicationBuilder().token(TOKEN).build()

    app.add_handler(CommandHandler("start", start))
    app.add_handler(CallbackQueryHandler(check, pattern="check"))

    logger.info("🚀 Bot is live and running...")
    app.run_polling()
