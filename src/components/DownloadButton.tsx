import { pdf } from "@react-pdf/renderer";
import { FileDown, LoaderCircle } from "lucide-react";
import { ComponentType, useCallback } from "react";

import { Button } from "@/components/ui/button.tsx";
import useAppState from "@/stores/useAppState.ts";

type DownloadProps<P> = {
  problemType: string;
  Element: ComponentType<P>;
} & P;
const DownloadButton = <P,>({
  Element,
  problemType,
  ...props
}: DownloadProps<P>) => {
  const loading = useAppState(({ loading }) => loading);
  const setLoading = useAppState(({ setLoading }) => setLoading);

  const handleDownload = useCallback(async () => {
    setLoading(true);
    const url = "";
    try {
      const blob = await pdf(
        <Element key={JSON.stringify(props)} {...(props as P)} />,
      ).toBlob();
      const url = URL.createObjectURL(blob);

      const response = await fetch(url);
      const blobData = await response.blob();
      const blobUrl = URL.createObjectURL(blobData);

      const link = document.createElement("a");
      link.href = blobUrl;

      const date = new Date();
      const suffix = [
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        "_",
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      ].join("");

      link.download = `${problemType}_${suffix}.pdf`;
      link.click();
    } catch (error) {
      console.error(error);
      alert("Error generating PDF");
    } finally {
      if (url) URL.revokeObjectURL(url);
      setLoading(false);
    }
  }, [Element, problemType, props, setLoading]);

  const icon = loading ? (
    <LoaderCircle className={"animate-spin"} />
  ) : (
    <FileDown />
  );

  const label = loading ? "Downloading" : "Download";

  return (
    <Button
      variant={"ghost"}
      onClick={handleDownload}
      disabled={loading}
      className={"cursor-pointer"}
    >
      {icon} {label}
    </Button>
  );
};

export default DownloadButton;
