import { Skeleton } from "antd";

import s from './Skeletons.module.css';

type Props = {
  amount: number;
};

export const Skeletons = ({ amount }: Props) => {
  if (!amount) return null;

  return (
    <section className={s.skeletons}>
      {Array.from(Array(amount)).map((_, index) => {
        return (
          <div key={index} className={s.skeleton}>
            <Skeleton active />
          </div>
        );
      })}
    </section>
  );
};
