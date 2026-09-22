"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Marks";
import { Reveal } from "@/components/ui/Reveal";
import { pricing } from "@/lib/content/home";

const billingOptions = [
  { label: "Monthly", yearly: false },
  { label: "Yearly", yearly: true },
];

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="scroll-mt-24 py-20 sm:py-28"
    >
      <div className="container-page">
        <div className="mx-auto max-w-170 text-center">
          <Reveal>
            <span className="text-label-sm uppercase tracking-[0.12em] text-accent-violet">
              {pricing.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h2 id="pricing-title" className="mt-md font-display text-headline-lg">
              {pricing.title}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-lg text-body-lg text-on-surface-variant">
              {pricing.body}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-8 inline-flex items-center gap-xs rounded-full bg-surface-container p-1">
              {billingOptions.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setYearly(option.yearly)}
                  aria-pressed={yearly === option.yearly}
                  className={`rounded-full px-lg py-2 text-body-sm font-semibold transition-colors duration-200 ease-glide ${
                    yearly === option.yearly
                      ? "bg-surface-bright text-on-surface ring-1 ring-outline"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {option.label}
                  {option.yearly ? (
                    <span className="ml-sm text-label-sm text-accent-violet">
                      {pricing.yearlyDiscountLabel}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-md lg:grid-cols-4">
          {pricing.plans.map((plan, i) => {
            const price = yearly ? plan.yearly : plan.monthly;
            const muted = plan.featured
              ? "text-inverse-on-surface-variant"
              : "text-on-surface-variant";

            return (
              <Reveal key={plan.name} delay={i * 80}>
                <article
                  className={`flex h-full flex-col rounded-md p-8 ${
                    plan.featured
                      ? "bg-inverse-surface text-inverse-on-surface shadow-lifted"
                      : "bg-surface-bright ring-1 ring-outline"
                  }`}
                >
                  <div className="flex items-center gap-sm">
                    <h3 className="font-display text-quote">{plan.name}</h3>
                    {plan.featured ? (
                      <span className="rounded-full bg-secondary px-md py-1 text-label-sm text-on-secondary">
                        {pricing.featuredBadge}
                      </span>
                    ) : null}
                  </div>

                  <p className={`mt-sm text-body-sm ${muted}`}>{plan.blurb}</p>

                  <p className="mt-lg flex items-baseline gap-1.5">
                    {price === null ? (
                      <span className="font-display text-stat">Custom</span>
                    ) : (
                      <>
                        <span className="font-display text-stat">${price}</span>
                        <span className={`text-label-sm font-normal ${muted}`}>
                          {pricing.unit}
                        </span>
                      </>
                    )}
                  </p>

                  <ul className="mt-lg flex flex-1 flex-col gap-md">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-sm">
                        <CheckIcon
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            plan.featured ? "text-secondary" : "text-accent-violet"
                          }`}
                        />
                        <span className={`text-body-sm ${muted}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <ButtonLink
                    href={plan.cta.href}
                    variant={
                      plan.featured
                        ? "primary"
                        : plan.monthly === null
                          ? "ghost"
                          : "outline"
                    }
                    className="mt-8 w-full"
                  >
                    {plan.cta.label}
                  </ButtonLink>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
