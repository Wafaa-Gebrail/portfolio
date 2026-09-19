import styles from './Tag.module.css';

interface TagProps {
  label: string;
  variant?: 'default' | 'primary' | 'outline';
}

export function Tag({ label, variant = 'default' }: TagProps) {
  return <span className={`${styles.tag} ${styles[variant]}`}>{label}</span>;
}
