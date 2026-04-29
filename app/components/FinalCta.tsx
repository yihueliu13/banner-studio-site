"use client";

import { useEffect, useRef, useState } from "react";

type FormData = {
  name: string;
  dept: string;
  email: string;
  notion: string;
};

const initial: FormData = { name: "", dept: "", email: "", notion: "" };

export default function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const [data, setData] = useState<FormData>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  // Reveal observer
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -100px 0px" }
    );
    root.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const update = (key: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setData((d) => ({ ...d, [key]: e.target.value }));

  const [errorMsg, setErrorMsg] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !json.success) {
        throw new Error(json.error || `HTTP ${res.status}`);
      }
      setStatus("success");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "送出失敗";
      setErrorMsg(msg);
      setStatus("error");
    }
  };

  return (
    <section className="final-cta" id="apply" ref={sectionRef}>
      <div className="final-cta-card">
        <div className="final-cta-content">
          {/* 左:文字 */}
          <div className="final-cta-intro reveal">
            <h2>
              下一個 banner
              <br />
              3 分鐘搞定
            </h2>
            <p className="final-cta-subtitle">
              填 4 個欄位，24 小時內 Kay 會把你加進 Notion 和 Chat 群組，你就可以開始產 banner 了。
            </p>
            <ul className="final-cta-points">
              <li>平均 3 分鐘產完一組 PC + M banner</li>
              <li>72% 一次通過，不用反覆改稿</li>
              <li>每 100 張成本約台幣 120 元，幾乎等於免費</li>
            </ul>
          </div>

          {/* 右:表單 / 成功訊息 */}
          <div className="reveal">
            {status !== "success" ? (
              <form className="apply-form" onSubmit={onSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="form-name">
                    姓名<span className="required">*</span>
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    id="form-name"
                    name="name"
                    placeholder="王小明"
                    required
                    value={data.name}
                    onChange={update("name")}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="form-dept">
                    部門<span className="required">*</span>
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    id="form-dept"
                    name="dept"
                    placeholder="行銷部 / 營運部 / …"
                    required
                    value={data.dept}
                    onChange={update("dept")}
                  />
                </div>

                <div className="form-group full">
                  <label className="form-label" htmlFor="form-email">
                    Email<span className="required">*</span>
                  </label>
                  <input
                    className="form-input"
                    type="email"
                    id="form-email"
                    name="email"
                    placeholder="you@ruten.com.tw"
                    required
                    value={data.email}
                    onChange={update("email")}
                    inputMode="email"
                    autoComplete="email"
                  />
                </div>

                <div className="form-group full">
                  <label className="form-label" htmlFor="form-notion">
                    Notion ID<span className="required">*</span>
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    id="form-notion"
                    name="notion"
                    placeholder="Notion workspace 帳號 email"
                    required
                    value={data.notion}
                    onChange={update("notion")}
                  />
                </div>

                <div className="form-submit-row">
                  <button
                    className="form-submit"
                    type="submit"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "送出中…" : "送出申請"}
                  </button>
                  <p className="form-meta">
                    申請 24 小時內開通 · 有問題 Google Chat 找 Kay
                  </p>
                </div>
                {status === "error" && (
                  <div className="form-error" role="alert">
                    送出失敗，請稍後再試或直接 Google Chat 找 Kay。
                    {errorMsg && (
                      <span className="form-error-detail">({errorMsg})</span>
                    )}
                  </div>
                )}
              </form>
            ) : (
              <div className="form-success is-visible">
                <div className="form-success-icon" aria-hidden="true">
                  ✓
                </div>
                <h3>申請已送出</h3>
                <p>Kay 已收到通知，24 小時內會把你加進 Notion 和 Chat 群組。</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
