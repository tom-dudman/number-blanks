interface TitleWithSubtitleProps {
  title?: string;
  subtitle: string;
}

const TitleWithSubtitle = ({ title, subtitle }: TitleWithSubtitleProps) => (
  <div className="text-center">
    <h1
      className={
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      }
    >
      {title ?? "Number Blanks"}
    </h1>
    <p className={"text-sm text-muted-foreground"}>{subtitle}</p>
  </div>
);

export default TitleWithSubtitle;
