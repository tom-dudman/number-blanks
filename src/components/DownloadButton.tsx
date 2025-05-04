import { pdf } from "@react-pdf/renderer";
import { FileDown, LoaderCircle } from "lucide-react";
import { useCallback } from "react";

import { Button } from "@/components/ui/button.tsx";
import NumberBlanksPdf from "@/problems/NumberBlank/pdf/NumberBlanksPdf.tsx";
import useAppState from "@/stores/useAppState.ts";
import useNumberBlankStore from "@/stores/useNumberBlankStore.ts";

const DownloadButton = () => {
  const { modes, difficulty } = useNumberBlankStore.getState();

  const loading = useAppState(({ loading }) => loading);
  const setLoading = useAppState(({ setLoading }) => setLoading);

  const handleDownload = useCallback(async () => {
    setLoading(true);
    const url = "";
    try {
      const blob = await pdf(
        <NumberBlanksPdf
          key={[...modes, difficulty].join()}
          modes={modes}
          difficulty={difficulty}
        />,
      ).toBlob();
      const url = URL.createObjectURL(blob);

      const response = await fetch(url);
      const blobData = await response.blob();
      const blobUrl = URL.createObjectURL(blobData);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `NumberBlank.pdf`; // todo make this dynamic
      link.click();
    } catch (error) {
      console.error(error);
      alert("Error generating PDF");
    } finally {
      if (url) URL.revokeObjectURL(url);
      setLoading(false);
    }
  }, [difficulty, modes, setLoading]);

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
