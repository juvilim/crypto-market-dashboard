import { ArrowDownIcon } from "./Down";

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export const ArrowLeftIcon = ({ className, style }: Props) => {
  return (
    <ArrowDownIcon
      className={`transform rotate-90 ${className}`}
      style={style}
    />
  );
};
