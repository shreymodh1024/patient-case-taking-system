import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { scanMedicalReport } from "./ocr.server";

const MAX_BASE64_LENGTH = 7_000_000; // ~5MB file

const InputSchema = z.object({
  fileName: z.string().min(1).max(200),
  mimeType: z.string().min(1).max(100),
  base64Data: z.string().min(1).max(MAX_BASE64_LENGTH),
  language: z.string().default("English"),
});

export const scanReport = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) =>
    scanMedicalReport(data.fileName, data.mimeType, data.base64Data, data.language),
  );
