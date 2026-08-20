import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "E-Rapor Ulil Albab Al Islami";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #ecfdf5 0%, #ffffff 45%, #f0fdf4 100%)",
          position: "relative",
          color: "#064e3b",
          fontFamily: "Arial",
        }}
      >
        {/* Decorative circles */}

        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(16,185,129,0.08)",
            top: -180,
            left: -150,
          }}
        />

        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(245,158,11,0.08)",
            bottom: -180,
            right: -120,
          }}
        />

        {/* Islamic ornament */}

        <div
          style={{
            position: "absolute",
            top: 45,
            left: 50,
            right: 50,
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #10b981, #d4af37, #10b981, transparent)",
          }}
        />

        {/* Logo */}

        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 30,
            background:
              "linear-gradient(135deg, #059669, #047857)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              "0 15px 40px rgba(5,150,105,0.25)",
            marginBottom: 30,
          }}
        >
          <div
            style={{
              color: "#ffffff",
              fontSize: 58,
              fontWeight: 800,
            }}
          >
            ؏
          </div>
        </div>

        {/* Main title */}

        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            letterSpacing: -1,
            textAlign: "center",
            color: "#064e3b",
          }}
        >
          E-RAPOR
        </div>

        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            marginTop: 8,
            color: "#059669",
            textAlign: "center",
          }}
        >
          ULIL ALBAB AL ISLAMI
        </div>

        {/* Description */}

        <div
          style={{
            marginTop: 25,
            fontSize: 22,
            color: "#475569",
            textAlign: "center",
            maxWidth: 850,
            lineHeight: 1.5,
          }}
        >
          Sistem Rapor Digital Terpadu untuk Akademik,
          Penilaian, Tahfidz, Akhlak & Kepribadian Santri
        </div>

        {/* Bottom badge */}

        <div
          style={{
            position: "absolute",
            bottom: 45,
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 18,
            fontWeight: 600,
            color: "#047857",
          }}
        >
          <span>
            PONDOK PESANTREN TERPADU ULIL ALBAB AL ISLAMI
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 35,
            left: 50,
            right: 50,
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #10b981, #d4af37, #10b981, transparent)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}