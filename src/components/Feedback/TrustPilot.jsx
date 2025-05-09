import { useEffect, useRef } from "react";

export default function Trustpilot() {
  const widgetRef = useRef(null);

  useEffect(() => {
    // 1. If the script isn’t already loaded, inject it
    if (!window.Trustpilot) {
      const script = document.createElement("script");
      script.src = "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
      script.async = true;
      script.onload = () => {
        window.Trustpilot.loadFromElement(widgetRef.current);
      };
      document.head.appendChild(script);
    } else {
      // 2. If script is already available, just load the widget
      window.Trustpilot.loadFromElement(widgetRef.current);
    }
  }, []);

  return (
    <div
      ref={widgetRef}
      class="trustpilot-widget"
      className="mb-10 -y-10"
      data-locale="en-US"
      data-template-id="56278e9abfbbba0bdcd568bc"
      data-businessunit-id="681a8faa43a58c4ab5221cee"
      data-style-height="52px"
      data-style-width="100%"
    >
      <a href="https://www.trustpilot.com/review/doctorkays.com" target="_blank" rel="noopener">
        Trustpilot
      </a>
    </div>
  );
}
