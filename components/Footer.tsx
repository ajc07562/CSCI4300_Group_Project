// components/Footer.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <span className="brand-text">☕ Campus Cravings</span>
        </div>
        <div className="footer-social-label">Social Media:</div>
        <div className="footer-icons">
          <Link href="https://facebook.com" target="_blank">
            <Image src="/images/facebook-icon.png" alt="Facebook" width={24} height={24} />
          </Link>
          <Link href="https://x.com" target="_blank">
            <Image src="/images/x-icon.png" alt="X (Twitter)" width={24} height={24} />
          </Link>
          <Link href="https://instagram.com" target="_blank">
            <Image src="/images/instagram-icon.png" alt="Instagram" width={24} height={24} />
          </Link>
          <Link href="https://pinterest.com" target="_blank">
            <Image src="/images/pinterest-icon.png" alt="Pinterest" width={24} height={24} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
