import { useImagePreviewUrlStore } from "@/stores";
import { useColor } from "color-thief-react";

const usePickMainImageColor = (imageExistingUrl = "") => {
  const { imagePreviewUrls } = useImagePreviewUrlStore();
  const { data: main_image_color } = useColor(
    imageExistingUrl ? `${import.meta.env.VITE_APP_IMAGE_DOMAIN + imageExistingUrl}` : imagePreviewUrls[0],
    "hex",
    {
      crossOrigin: "anonymous",
    },
  );
  return main_image_color;
};

export default usePickMainImageColor;
