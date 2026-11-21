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

function Sidebar() {
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
        <p className="mt-2 text-sm text-amber-400">Demo mode</p>
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

function Dashboard() {
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

        <div className="flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm text-amber-400">
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          Simulation active
        </div>
      </header>

      <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Current RMS"
          value="2.14 A"
          subtitle="Simulated measurement"
          icon={Activity}
        />
        <StatCard
          title="Operating mode"
          value="Washing"
          subtitle="Example classification"
          icon={Waves}
        />
        <StatCard
          title="Confidence"
          value="94.2%"
          subtitle="Illustrative demo value"
          icon={Gauge}
        />
        <StatCard
          title="Device status"
          value="Offline"
          subtitle="ESP32 not connected"
          icon={Wifi}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-[#111a2b] p-5 xl:col-span-2">
          <div className="mb-6">
            <h3 className="font-semibold">Electrical current</h3>
            <p className="mt-1 text-sm text-slate-500">
              Example current readings over time
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

      <section className="mt-6 rounded-2xl border border-slate-800 bg-[#111a2b] p-5">
        <h3 className="font-semibold">Recent activity</h3>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-3">
            <Droplets className="text-cyan-400" size={20} />
            <div>
              <p>Washing mode detected</p>
              <p className="text-xs text-slate-500">
                Example event · Demo data
              </p>
            </div>
          </div>
          <span className="text-xs text-slate-500">00:40</span>
        </div>
      </section>
    </main>
  );
}

function App() {
  return (
    <div className="flex min-h-screen bg-[#090d18] text-slate-100">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default App;
