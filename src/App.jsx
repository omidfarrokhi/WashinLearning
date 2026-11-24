import { useEffect, useState } from "react";
import { connectMQTT } from "./mqtt";

import {
  Activity,
  Cpu,
  Droplets,
  Gauge,
  LayoutDashboard,
  Settings,
  Waves,
  Wifi,
} from "lucide-react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const currentData = [
  { time: "00:00", current: 0.2 },
  { time: "00:05", current: 0.4 },
  { time: "00:10", current: 1.2 },
  { time: "00:15", current: 1.5 },
  { time: "00:20", current: 2.1 },
  { time: "00:25", current: 1.8 },
  { time: "00:30", current: 2.4 },
  { time: "00:35", current: 1.9 },
  { time: "00:40", current: 2.2 },
];

function Sidebar({ mqttStatus }) {
  return (
    <aside className="w-64 shrink-0 border-r border-slate-800 bg-[#0d1322] p-6">
      <div className="mb-12 flex items-center gap-3">
        <div className="rounded-xl bg-cyan-500/15 p-2 text-cyan-400">
          <Waves size={25} />
        </div>
        <div>
          <h1 className="text-xl font-bold">WashinLearning</h1>
          <p className="text-xs text-slate-500">Smart monitoring</p>
        </div>
      </div>

      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Workspace
      </p>

      <nav className="space-y-2">
        <div className="flex items-center gap-3 rounded-xl bg-cyan-500/10 px-4 py-3 text-cyan-400">
          <LayoutDashboard size={19} />
          Dashboard
        </div>

        <div className="flex items-center gap-3 px-4 py-3 text-slate-400">
          <Activity size={19} />
          Monitoring
        </div>

        <div className="flex items-center gap-3 px-4 py-3 text-slate-400">
          <Gauge size={19} />
          Detection
        </div>

        <div className="flex items-center gap-3 px-4 py-3 text-slate-400">
          <Settings size={19} />
          Settings
        </div>
      </nav>

      <div className="mt-16 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm text-slate-300">
          <Cpu size={17} />
          Device
        </div>
        <p className="text-xs text-slate-500">ESP32 connection</p>
        <p
          className={`mt-2 text-sm ${
            mqttStatus === "connected" ? "text-emerald-400" : "text-amber-400"
          }`}>
          {mqttStatus === "connected"
            ? "MQTT Connected"
            : mqttStatus === "connecting"
              ? "Connecting..."
              : mqttStatus === "reconnecting"
                ? "Reconnecting..."
                : mqttStatus === "error"
                  ? "Connection error"
                  : "Disconnected"}
        </p>
      </div>
    </aside>
  );
}

function StatCard({ title, value, subtitle, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#111a2b] p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-400">{title}</p>
        <Icon className="text-cyan-400" size={20} />
      </div>
      <p className="text-3xl font-semibold">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{subtitle}</p>
    </div>
  );
}

function Dashboard({
  mqttStatus,
  telemetry,
  messageCount,
  deviceOnline,
  liveUptime,
  lastCommunication,
  messageHistory,
}) {
  return (
    <main className="min-w-0 flex-1 p-5 md:p-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Workspace / Overview</p>
          <h2 className="mt-2 text-3xl font-bold">Dashboard</h2>
          <p className="mt-1 text-sm text-slate-400">
            Washing machine operating-mode monitor
          </p>
        </div>

        <div
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm ${
            mqttStatus === "connected"
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
              : "border-amber-500/20 bg-amber-500/10 text-amber-400"
          }`}>
          <span
            className={`h-2 w-2 rounded-full ${
              mqttStatus === "connected" ? "bg-emerald-400" : "bg-amber-400"
            }`}
          />
          {mqttStatus === "connected" ? "MQTT Connected" : "MQTT Disconnected"}
        </div>
      </header>

      <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Current RMS"
          value="Not measured"
          subtitle="Waiting for current sensor"
          icon={Activity}
        />

        <StatCard
          title="Operating mode"
          value="Unknown"
          subtitle="Detection not implemented"
          icon={Waves}
        />

        <StatCard
          title="MQTT messages"
          value={messageCount}
          subtitle="Messages received from ESP32"
          icon={Gauge}
        />

        <StatCard
          title="Device status"
          value={deviceOnline ? "Online" : "Offline"}
          subtitle={
            deviceOnline
              ? "Receiving ESP32 messages"
              : "No recent ESP32 messages"
          }
          icon={Wifi}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-[#111a2b] p-5 xl:col-span-2">
          <div className="mb-6">
            <h3 className="font-semibold">Electrical current</h3>
            <p className="mt-1 text-sm text-slate-500">
              Demo chart — current sensor not connected yet
            </p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentData}>
                <defs>
                  <linearGradient id="currentFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid stroke="#263247" strokeDasharray="3 3" />
                <XAxis dataKey="time" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    background: "#111a2b",
                    border: "1px solid #334155",
                    borderRadius: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="current"
                  stroke="#22d3ee"
                  fill="url(#currentFill)"
                  strokeWidth={2}
                  name="Current (A)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-[#111a2b] p-5">
          <h3 className="font-semibold">Appliance information</h3>
          <p className="mt-1 text-sm text-slate-500">Registered machine</p>

          <div className="my-6 flex h-28 items-center justify-center rounded-xl bg-cyan-500/10">
            <Waves size={48} className="text-cyan-400" />
          </div>

          <p className="text-lg font-semibold">Pakshoma</p>
          <p className="text-sm text-slate-400">BWF-40118 IWT</p>

          <div className="mt-5 space-y-3 border-t border-slate-800 pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Capacity</span>
              <span>9 kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Rated power</span>
              <span>1800 W</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Voltage</span>
              <span>220–240 V</span>
            </div>
          </div>
        </div>
      </section>

      {/* DEVICE TELEMETRY SECTION */}
      <section className="mt-6 rounded-2xl border border-slate-800 bg-[#111a2b] p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-semibold">Device telemetry</h3>
            <p className="mt-1 text-sm text-slate-500">
              Live ESP32 information
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs ${
              deviceOnline
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-red-500/10 text-red-400"
            }`}>
            {deviceOnline ? "Device online" : "Device offline"}
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs text-slate-500">Device</p>
            <p className="mt-1 font-medium">
              {telemetry?.device || "Waiting..."}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Message count</p>
            <p className="mt-1 font-medium">
              {telemetry?.message_count ?? "--"}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Live uptime</p>
            <p className="mt-1 font-medium">
              {liveUptime !== null ? formatDuration(liveUptime) : "--"}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Last communication</p>
            <p className="mt-1 font-medium">{lastCommunication}</p>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-800 pt-5">
          <h4 className="mb-4 text-sm font-semibold">Recent MQTT messages</h4>

          {messageHistory.length > 0 ? (
            <div className="space-y-3">
              {messageHistory.map((message, index) => (
                <div
                  key={`${message.receivedAt}-${index}`}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-900/60 p-3">
                  <div>
                    <p className="text-sm text-slate-200">
                      Message #{message.message_count}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Mode: {message.mode}
                    </p>
                  </div>

                  <span className="text-xs text-slate-500">
                    {new Date(message.receivedAt).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              Waiting for MQTT messages...
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

function formatDuration(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }

  return `${seconds}s`;
}

function App() {
  const [mqttStatus, setMqttStatus] = useState("connecting");
  const [telemetry, setTelemetry] = useState(null);
  const [messageCount, setMessageCount] = useState(0);

  const [lastSeen, setLastSeen] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);

  const [now, setNow] = useState(Date.now());

  // MQTT connection
  useEffect(() => {
    const disconnect = connectMQTT(
      (data) => {
        const receivedAt = Date.now();

        setTelemetry(data.data);
        setLastSeen(receivedAt);
        setMessageCount((previous) => previous + 1);

        setMessageHistory((previous) =>
          [
            {
              ...data.data,
              receivedAt,
            },
            ...previous,
          ].slice(0, 10),
        );
      },
      (status) => {
        setMqttStatus(status);
      },
    );

    const secondsSinceLastMessage = lastSeen
      ? Math.floor((now - lastSeen) / 1000)
      : null;

    const deviceOnline =
      secondsSinceLastMessage !== null && secondsSinceLastMessage <= 15;

    const liveUptime = telemetry
      ? telemetry.uptime_seconds + (deviceOnline ? secondsSinceLastMessage : 0)
      : null;

    const lastCommunication = lastSeen
      ? secondsSinceLastMessage === 0
        ? "Just now"
        : `${secondsSinceLastMessage}s ago`
      : "Never";

    return () => {
      disconnect();
    };
  }, []);

  // Update the clock every second

  useEffect(() => {
    const disconnect = connectMQTT(
      (data) => {
        const receivedAt = Date.now();

        setTelemetry(data.data);
        setLastSeen(receivedAt);
        setMessageCount((previous) => previous + 1);

        setMessageHistory((previous) =>
          [
            {
              ...data.data,
              receivedAt,
            },
            ...previous,
          ].slice(0, 10),
        );
      },
      (status) => {
        setMqttStatus(status);
      },
    );

    return () => {
      disconnect();
    };
  }, []);

  const secondsSinceLastMessage = lastSeen
    ? Math.floor((now - lastSeen) / 1000)
    : null;

  const deviceOnline =
    secondsSinceLastMessage !== null && secondsSinceLastMessage <= 15;

  const liveUptime = telemetry
    ? telemetry.uptime_seconds + (deviceOnline ? secondsSinceLastMessage : 0)
    : null;

  const lastCommunication = lastSeen
    ? secondsSinceLastMessage === 0
      ? "Just now"
      : `${secondsSinceLastMessage}s ago`
    : "Never";

  return (
    <div className="flex min-h-screen bg-[#090d18] text-slate-100">
      <Sidebar mqttStatus={mqttStatus} />

      <Dashboard
        mqttStatus={mqttStatus}
        telemetry={telemetry}
        messageCount={messageCount}
        deviceOnline={deviceOnline}
        liveUptime={liveUptime}
        lastCommunication={lastCommunication}
        messageHistory={messageHistory}
      />
    </div>
  );
}

export default App;
