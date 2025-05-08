/**
 * NavSection
 *
 * @package organisms
 */
import style from './styles.module.css';
import Link from 'next/link';

/**
 * @returns {JSX.Element}
 */
export const NavSection = () => {
  return (
    <section className={style.navContainer}>
      <nav>
        <ul className={style.ul}>
          <li className={style.li}>
            <Link href={'/'}>Top</Link>
          </li>
          <li className={style.li}>
            <Link href={'/create'}>Create</Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};
