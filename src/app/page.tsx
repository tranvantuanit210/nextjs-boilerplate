import AreaChartComponent from '@/components/chart/area-chart'
import BarChartComponent from '@/components/chart/bar-chart'
import PieChartComponent from '@/components/chart/pie-chart'
import RadarChartComponent from '@/components/chart/radar-chart'

export default function Home() {
  return (
    <div className='grid grid-cols-2 gap-4 h-full items-center'>
      <AreaChartComponent />
      <BarChartComponent />
      <PieChartComponent />
      <RadarChartComponent />
    </div>
  )
}
