import StatisticsContent from "@/components/dashboard/(admin)/StatisticsContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Statistics - JobQuest",
  description: "See al the stats of the website",
};

export default function StatisticsPage() {
  return <StatisticsContent />;
}