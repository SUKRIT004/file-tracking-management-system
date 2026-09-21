import { Card, CardContent } from "@/components/ui/card";

export default function StatsCard({
    title,
    value,
    icon: Icon,
    color,
}) {
    return (
        <Card className="shadow-lg hover:shadow-xl transition">

            <CardContent className="flex justify-between items-center p-6">

                <div>

                    <p className="text-muted-foreground">
                        {title}
                    </p>

                    <h1 className="text-4xl font-bold mt-2">
                        {value}
                    </h1>

                </div>

                <div className={`${color} p-4 rounded-xl`}>

                    <Icon
                        size={28}
                        className="text-white"
                    />

                </div>

            </CardContent>

        </Card>
    );
}