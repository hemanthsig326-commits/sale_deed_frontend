import { NextResponse } from "next/server";
import { Document, Packer, Paragraph } from "docx";

export async function POST(req) {
  const { buyer, seller } = await req.json();

  const text = `${seller} is selling to ${buyer}.`;

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph(text)
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": "attachment; filename=sale-deed.docx",
    },
  });
}
