"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const formatDate = (d: Date) =>
  `${d.getFullYear()}.${d.getMonth() + 1}.${String(d.getDate()).padStart(2, "0")}`;

interface Weather {
  city: string;
  weather: string;
  temperature: number;
}

const CITIES: { name: string; code: string }[] = [
  { name: "北京", code: "110000" },
  { name: "上海", code: "310000" },
  { name: "广州", code: "440100" },
  { name: "深圳", code: "440300" },
  { name: "杭州", code: "330100" },
  { name: "成都", code: "510100" },
  { name: "重庆", code: "500000" },
  { name: "南京", code: "320100" },
  { name: "武汉", code: "420100" },
  { name: "西安", code: "610100" },
  { name: "天津", code: "120000" },
  { name: "苏州", code: "320500" },
  { name: "长沙", code: "430100" },
  { name: "青岛", code: "370200" },
  { name: "厦门", code: "350200" },
  { name: "郑州", code: "410100" },
];

const STORAGE_KEY = "dramaclaw.weatherCity";

const weatherIcon = (text: string) => {
  if (text.includes("雷")) return "⛈";
  if (text.includes("雪")) return "❄";
  if (text.includes("雨")) return "🌧";
  if (text.includes("雾") || text.includes("霾")) return "🌫";
  if (text.includes("晴")) return "☀";
  if (text.includes("阴")) return "☁";
  if (text.includes("云")) return "⛅";
  return "☁";
};

/**
 * 顶部标题栏组件 — 使用切图
 */
export default function HeaderBar() {
  const [today, setToday] = useState("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [cityCode, setCityCode] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setToday(formatDate(new Date()));
    const timer = setInterval(() => setToday(formatDate(new Date())), 60_000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setCityCode(localStorage.getItem(STORAGE_KEY));
  }, []);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const url = cityCode ? `/api/weather?city=${cityCode}` : "/api/weather";
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok || cancelled) return;
        const data = await res.json();
        if (!cancelled) {
          setWeather({
            city: data.city,
            weather: data.weather,
            temperature: data.temperature,
          });
        }
      } catch {
        // 接口失败时保持上一次状态，不打断大屏展示
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    const timer = setInterval(load, 30 * 60_000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [cityCode, refreshKey]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const pickCity = (code: string) => {
    localStorage.setItem(STORAGE_KEY, code);
    setOpen(false);
    if (code === cityCode) {
      setRefreshKey((k) => k + 1);
    } else {
      setCityCode(code);
    }
  };

  const selectedCityName = CITIES.find((c) => c.code === cityCode)?.name;
  const displayCity = selectedCityName ?? weather?.city.replace("市", "") ?? "";

  return (
    <header className="relative w-full" style={{ height: "80px" }}>
      <Image
        src="/assets/images/header.png"
        alt=""
        fill
        className="object-contain"
        priority
      />
      {/* 左侧：日期 + 状态 */}
      <div
        className="absolute left-20 bottom-4 flex items-center gap-4 text-xs z-10"
        style={{ color: "#8ba3c7" }}
      >
        <span
          className="digit-font tracking-widest"
          style={{ color: "#e8f0fe", fontSize: "13px" }}
        >
          {today}
        </span>
        <span className="opacity-40">|</span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
          <span>AI引擎运转正常</span>
        </div>
      </div>
      {/* 右侧：天气 + 年份 */}
      <div
        className="absolute right-20 bottom-4 flex items-center gap-6 text-xs z-10"
        style={{ color: "#8ba3c7" }}
      >
        <div ref={wrapRef} className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 cursor-pointer hover:text-white transition-all"
            style={{ color: "inherit", opacity: loading ? 0.5 : 1 }}
          >
            <span>{weather ? weatherIcon(weather.weather) : "☁"}</span>
            <span>
              {weather
                ? `${displayCity} ${weather.weather} ${weather.temperature}°C`
                : displayCity
                  ? `${displayCity} 加载中…`
                  : "加载中…"}
            </span>
            <span className="opacity-60" style={{ fontSize: "10px" }}>
              ▾
            </span>
          </button>
          {open && (
            <div
              className="absolute right-0 mt-2 grid grid-cols-2 gap-1 p-2 rounded shadow-lg z-30"
              style={{
                background: "rgba(10, 22, 40, 0.95)",
                border: "1px solid rgba(139, 163, 199, 0.3)",
                minWidth: "180px",
                backdropFilter: "blur(4px)",
              }}
            >
              {CITIES.map((c) => {
                const active = c.code === cityCode;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => pickCity(c.code)}
                    className="px-2 py-1 text-left rounded hover:bg-white/10 transition-colors"
                    style={{
                      color: active ? "#e8f0fe" : "#8ba3c7",
                      background: active
                        ? "rgba(34, 197, 94, 0.15)"
                        : "transparent",
                    }}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <span className="opacity-40">|</span>
        <span>丙午马年</span>
      </div>
    </header>
  );
}
