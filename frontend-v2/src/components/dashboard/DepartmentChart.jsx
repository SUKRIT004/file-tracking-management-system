import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

export default function DepartmentChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>

                <XAxis dataKey="department" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="count" radius={[8,8,0,0]} />

            </BarChart>
        </ResponsiveContainer>
    );
}