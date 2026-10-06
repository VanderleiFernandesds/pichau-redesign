import { BENEFITS } from '../../data/home';

export default function Benefits() {
  return (
    <section className="mt-[30px] grid grid-cols-[1fr] gap-[22px] border-t border-line py-7 sm:grid-cols-[repeat(3,1fr)] sm:gap-5 sm:py-10">
      {BENEFITS.map(({ icon: Icon, ...benefit }) => (
        <div key={benefit.title} className="text-center">
          <div className="inline-flex items-center gap-1.5">
            <Icon aria-hidden="true" className="size-[18px]" />
            <b className="text-[13px]">{benefit.title}</b>
          </div>
          <span className="mt-2 block text-[11px] text-muted">{benefit.description}</span>
        </div>
      ))}
    </section>
  );
}
