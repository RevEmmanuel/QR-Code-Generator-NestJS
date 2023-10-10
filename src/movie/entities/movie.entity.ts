import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  qr_slug: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'varchar' })
  release_date: string;

  @Column({ type: 'varchar' })
  rating: string;

  @Column({ type: 'varchar' })
  genre: string;
}
