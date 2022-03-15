import { ArrowDownIcon } from "./Down";

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export const ArrowUpIcon = ({ className, style }: Props) => {
  return (
    <ArrowDownIcon
      className={`transform rotate-180 ${className}`}
      style={style}
    />
  );
};
