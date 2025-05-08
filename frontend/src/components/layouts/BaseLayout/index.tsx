/**
 * BaseLayout
 *
 * @package organisms
 */

import { FC } from 'react';
import styles from './styles.module.css';
import { NavSection } from '@/components/organisms/NavSection';

interface BaseLayoutProps {
  children: React.ReactNode;
  title: string;
}

/**
 * @returns {JSX.Element}
 */
export const BaseLayout: FC<BaseLayoutProps> = ({ children, title }) => {
  return (
    <>
      <NavSection />
      <h1 className={styles.title}>{title}</h1>
      {children}
    </>
  );
};
