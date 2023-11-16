import { useEffect } from "react";

export default function ShowAlert(props) {
  useEffect(() => {
    const timeoutId = setTimeout(props.handleAlert, 2000);
    return () => clearTimeout(timeoutId);
  }, [props.text]);

  return (
    <div className="show-alert">{props.text}</div>
  );
}