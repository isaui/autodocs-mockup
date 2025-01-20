import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  Clock,
  Users,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Activity,
  Calendar
} from 'lucide-react';

// Types for analytics data
interface WorkflowMetrics {
  totalExecutions: number;
  averageCompletionTime: number;
  successRate: number;
  failureRate: number;
  activeExecutions: number;
}

interface TimelineData {
  date: string;
  executions: number;
  completed: number;
  failed: number;
}

interface TaskMetrics {
  taskId: string;
  taskName: string;
  type: 'human' | 'automated';
  averageTime: number;
  successRate: number;
  totalExecutions: number;
}

interface BottleneckData {
  taskId: string;
  taskName: string;
  averageWaitTime: number;
  failureCount: number;
}

interface WorkflowAnalyticsProps {
  workflowId: string;
  startDate: Date;
  endDate: Date;
  metrics: WorkflowMetrics;
  timelineData: TimelineData[];
  taskMetrics: TaskMetrics[];
  bottlenecks: BottleneckData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const WorkflowAnalytics: React.FC<WorkflowAnalyticsProps> = ({
  metrics,
  timelineData,
  taskMetrics,
  bottlenecks
}) => {
  const [timeRange, setTimeRange] = React.useState('7d');

  const MetricCard = ({ title, value, icon, description }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    description?: string;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      {/* Overview Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <MetricCard
          title="Total Executions"
          value={metrics.totalExecutions}
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Success Rate"
          value={`${metrics.successRate}%`}
          icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
        />
        <MetricCard
          title="Average Time"
          value={`${metrics.averageCompletionTime}m`}
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Active Executions"
          value={metrics.activeExecutions}
          icon={<Users className="h-4 w-4 text-blue-500" />}
        />
        <MetricCard
          title="Failure Rate"
          value={`${metrics.failureRate}%`}
          icon={<XCircle className="h-4 w-4 text-red-500" />}
        />
      </div>

      {/* Detailed Analytics */}
      <Card className="col-span-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Workflow Analytics</CardTitle>
              <CardDescription>
                Detailed analysis of workflow performance
              </CardDescription>
            </div>
            <Select
              value={timeRange}
              onValueChange={setTimeRange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="timeline" className="space-y-4">
            <TabsList>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="bottlenecks">Bottlenecks</TabsTrigger>
              <TabsTrigger value="distribution">Distribution</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="space-y-4">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={timelineData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="completed"
                      stroke="#00C49F"
                      name="Completed"
                    />
                    <Line
                      type="monotone"
                      dataKey="failed"
                      stroke="#FF8042"
                      name="Failed"
                    />
                    <Line
                      type="monotone"
                      dataKey="executions"
                      stroke="#0088FE"
                      name="Total Executions"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="tasks" className="space-y-4">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={taskMetrics}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="taskName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="averageTime"
                      fill="#0088FE"
                      name="Avg Time (min)"
                    />
                    <Bar
                      dataKey="successRate"
                      fill="#00C49F"
                      name="Success Rate (%)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="bottlenecks" className="space-y-4">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={bottlenecks}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="taskName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="averageWaitTime"
                      fill="#FFBB28"
                      name="Avg Wait Time (min)"
                    />
                    <Bar
                      dataKey="failureCount"
                      fill="#FF8042"
                      name="Failures"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="distribution" className="space-y-4">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskMetrics}
                      dataKey="totalExecutions"
                      nameKey="taskName"
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      label
                    >
                      {taskMetrics.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkflowAnalytics;