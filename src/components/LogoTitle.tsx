type LogoTitleProps = {
  text: string;
  className?: string;
};

export default function LogoTitle(props: LogoTitleProps) {
  return (
    <h1 className={`text-2xl lg:text-7xl text-nowrap text-starlight-yellow font-bold ${props.className || ""}`}>
      {props.text}
    </h1>
  );
}
