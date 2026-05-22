import type { IconType } from 'react-icons';
import { FaFacebook, FaInstagram, FaSnapchat } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { CONTACT, type SocialPlatform } from '../../data/contact';

const SOCIAL_ICONS: Record<SocialPlatform, { icon: IconType; label: string }> = {
  x: { icon: FaXTwitter, label: 'X' },
  facebook: { icon: FaFacebook, label: 'فيسبوك' },
  instagram: { icon: FaInstagram, label: 'إنستغرام' },
  snapchat: { icon: FaSnapchat, label: 'سناب شات' },
};

type SocialLinksProps = {
  className?: string;
  linkClassName?: string;
};

export function SocialLinks({ className = 'flex flex-wrap gap-2', linkClassName }: SocialLinksProps) {
  const defaultLink =
    linkClassName ??
    'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-lg text-white/85 transition hover:border-primary/35 hover:bg-white/15 hover:text-white';

  return (
    <div className={className}>
      {CONTACT.social.map((item) => {
        const { icon: Icon, label } = SOCIAL_ICONS[item.platform];
        return (
          <a
            key={item.platform}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={defaultLink}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </a>
        );
      })}
    </div>
  );
}
