import type { ReactNode } from "react";
import "./style.css";
export const metadata={title:"Market Sentiment | Stock Game",description:"KOSPI, NASDAQ Composite and CNN Fear & Greed history"};
export default function Layout({children}:{children:ReactNode}){return <html lang="ko"><body>{children}</body></html>}
