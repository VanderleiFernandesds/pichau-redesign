import { Headset } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-[#f5f6f8] py-[9px] text-[9px] text-[#555] sm:text-[11px]">
      <div className="wrap flex justify-between">
        <span className="inline-flex items-center gap-1">
          <Headset aria-hidden="true" className="size-3 sm:size-3.5" />
          Atendimento ao cliente <b className="ml-[18px] hidden font-normal sm:inline">Seg a sex: 9h às 18h</b>
        </span>
        <span className="hidden sm:inline">Conceito independente · preços ilustrativos</span>
      </div>
    </div>
  );
}
