/**
 * BaseLayout
 *
 * @package organisms
 */

import { FC } from 'react';
import styles from './styles.module.css';

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
      <h1 className={styles.title}>{title}</h1>
      {children}
    </>
  );
};
