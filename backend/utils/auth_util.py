import os
import hmac
import base64
import hashlib
import time
from typing import Tuple

def hash_password(password: str, salt: bytes | None = None) -> Tuple[str, str]:
    if salt is None:
        salt = os.urandom(16)
    dk = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100_000)
    return base64.b64encode(salt).decode('utf-8'), base64.b64encode(dk).decode('utf-8')

def verify_password(password: str, salt_b64: str, hash_b64: str) -> bool:
    salt = base64.b64decode(salt_b64.encode('utf-8'))
    dk = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100_000)
    return hmac.compare_digest(base64.b64encode(dk).decode('utf-8'), hash_b64)

def make_token(subject: str) -> str:
    secret = os.getenv('AUTH_SECRET', 'wordprompt-secret')
    ts = str(int(time.time()))
    payload = f'{subject}:{ts}'
    sig = hmac.new(secret.encode('utf-8'), payload.encode('utf-8'), hashlib.sha256).digest()
    return base64.b64encode(payload.encode('utf-8')).decode('utf-8') + '.' + base64.b64encode(sig).decode('utf-8')
