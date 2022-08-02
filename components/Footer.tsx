import { GoMarkGithub } from 'react-icons/go';
import { FaTwitter } from 'react-icons/fa';
import { GrLinkedin } from 'react-icons/gr';

import footerStyles from '../styles/Footer.module.css';

export const Footer = () => {
  return (
    <div className={footerStyles.footerWrapper}>
      <a
        className={footerStyles.socialMedia}
        href='https://github.com/ellanan/spacestagram_II'
        target='_blank'
        rel='noreferrer'
      >
        <GoMarkGithub size={18} />
      </a>
      <a
        className={footerStyles.socialMedia}
        href='https://twitter.com/ellanan_'
        target='_blank'
        rel='noreferrer'
      >
        <FaTwitter size={18} />
      </a>
      <a
        className={footerStyles.socialMedia}
        href='https://www.linkedin.com/in/ella-nan-a8b39027/'
        target='_blank'
        rel='noreferrer'
      >
        <GrLinkedin size={18} />
      </a>
    </div>
  );
};
