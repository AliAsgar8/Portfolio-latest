/** Tiny script so dark mode doesn’t flash white on refresh. */
export function ThemeScript() {
  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var d=document.documentElement,s=localStorage.getItem("theme"),m=matchMedia("(prefers-color-scheme: dark)").matches,t=s==="system"||!s?(m?"dark":"light"):s;d.classList.remove("light","dark");d.classList.add(t);d.style.colorScheme=t}catch(e){}})()`,
      }}
    />
  );
}
