type LogoTitleProps = {
  text: string;
};

export default function LogoTitle(props:LogoTitleProps) {
  return (
    <h1 className="text-2xl lg:text-7xl text-nowrap">{props.text}</h1>
  );
}
