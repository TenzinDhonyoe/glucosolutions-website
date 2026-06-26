import Link from "next/link";
import { cn } from "@/lib/utils";
import type { IconType } from "./types";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-sky-700 text-white shadow-sm hover:bg-sky-800 active:bg-sky-800",
  secondary:
    "bg-card text-ink-900 border border-line-2 hover:bg-sunken active:bg-sunken",
  ghost: "bg-transparent text-sky-700 hover:bg-sky-50 active:bg-sky-100",
};

const SIZES: Record<Size, string> = {
  sm: "text-[13px] px-4 py-2 gap-1.5",
  md: "text-[15px] px-[22px] py-3 gap-2",
  lg: "text-base px-7 py-3.5 gap-2.5",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  pill?: boolean;
  iconLeft?: IconType;
  iconRight?: IconType;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type LinkProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

function classes({
  variant = "primary",
  size = "md",
  pill,
  fullWidth,
  className,
}: Pick<CommonProps, "variant" | "size" | "pill" | "fullWidth" | "className">) {
  return cn(
    "inline-flex items-center justify-center font-semibold font-sans transition-colors duration-150 outline-none disabled:cursor-not-allowed disabled:bg-sunken disabled:text-ink-400 disabled:border-transparent disabled:shadow-none",
    VARIANTS[variant],
    SIZES[size],
    pill ? "rounded-full" : "rounded-md",
    fullWidth && "w-full",
    className,
  );
}

const ICON_SIZE: Record<Size, number> = { sm: 15, md: 17, lg: 18 };

/**
 * Button — primary / secondary / ghost, three sizes, optional pill shape and
 * leading/trailing icons. Renders a Next `Link` when `href` is set, otherwise a
 * native `<button>`. Matches the DS button specimens.
 */
export function Button(props: ButtonProps | LinkProps) {
  const {
    variant = "primary",
    size = "md",
    pill,
    iconLeft: IconLeft,
    iconRight: IconRight,
    fullWidth,
    className,
    children,
    ...rest
  } = props;

  const content = (
    <>
      {IconLeft ? <IconLeft size={ICON_SIZE[size]} aria-hidden /> : null}
      {children}
      {IconRight ? <IconRight size={ICON_SIZE[size]} aria-hidden /> : null}
    </>
  );

  const cls = classes({ variant, size, pill, fullWidth, className });

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    const external = /^https?:\/\//.test(href) || href.startsWith("mailto:");
    if (external) {
      return (
        <a href={href} className={cls} {...anchorRest}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...anchorRest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
