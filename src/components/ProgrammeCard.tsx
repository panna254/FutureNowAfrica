import { ArrowRight } from 'lucide-react';
import type { Programme } from '@/data/programmes';
import { Link } from '@/router';

export function ProgrammeCard({
  programme,
  index = 0,
}: {
  programme: Programme;
  index?: number;
}) {
  const Icon = programme.icon;
  return (
    <Link
      to="/programs"
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-forest-100 shadow-xs hover:shadow-lg hover:border-leaf-200 transition-all duration-300 hover:-translate-y-1"
      ariaLabel={`${programme.title} — view programme details`}
    >
      <div className="relative aspect-16/10 overflow-hidden">
        <img
          src={programme.image}
          alt={programme.imageAlt}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-forest-950/40 to-transparent" />
        <span className="absolute top-4 left-4 flex items-center justify-center w-11 h-11 rounded-xl bg-cream/95 text-forest-800 shadow-xs">
          <Icon className="w-5 h-5" aria-hidden="true" />
        </span>
      </div>
      <div className="flex flex-col flex-1 p-6">
        <p className="type-meta text-leaf-600 mb-2">
          {String(index + 1).padStart(2, '0')}
        </p>
        <h3 className="text-card text-forest-900 group-hover:text-leaf-700 transition-colors">
          {programme.title}
        </h3>
        <p className="mt-2 text-caption text-leaf-700 font-medium">
          {programme.tagline}
        </p>
        <p className="mt-3 text-body text-forest-700/80 flex-1">
          {programme.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-ui text-forest-800 group-hover:text-leaf-700 transition-colors">
          Learn more
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
