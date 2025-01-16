import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function Pricing() {
    const includedFeatures = [
      'Private forum access',
      'Member resources', 
      'Entry to annual conference',
      'Official member t-shirt',
    ];
    
    const frequencies = [
        { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
        { value: 'annually', label: 'Annually', priceSuffix: '/year' },
    ];

    const [paymentFrequency, setFrequency] = useState('monthly');

  return (
    <div className="py-24 sm:py-32" id="pricing">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple no-tricks pricing</h2>
          <p className="mt-6 text-lg leading-8">
            Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas
            in. Explicabo id ut laborum.
          </p>
        </div>
        <Card className="mx-auto mt-16 max-w-2xl rounded-3xl sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight">Lorem ipsum</h3>
            <p className="mt-6 text-base leading-7 text-muted-foreground">
              Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis
              repellendus etur quidem assumenda.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-primary">What's included</h4>
              <div className="h-px flex-auto bg-border" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-muted-foreground sm:grid-cols-2 sm:gap-6"
            >
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3 items-center">
                  <FaCheck aria-hidden="true" className="flex-none text-primary" size={10} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <CardContent className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-secondary/50 py-10 text-center lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="flex flex-col items-center">
                <RadioGroup
                  value={paymentFrequency}
                  onValueChange={setFrequency}
                  className="flex items-center justify-center rounded-full text-center text-xs ring-1 ring-border mb-4 bg-background p-0.5"
                >
                  {frequencies.map((option) => (
                    <div key={option.value} className="flex items-center justify-center">
                      <RadioGroupItem
                        value={option.value}
                        id={option.value}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={option.value}
                        className={`cursor-pointer rounded-full px-3 py-1 ${
                          paymentFrequency === option.value ? "bg-primary text-primary-foreground" : ""
                        }`}
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                <div className="mx-auto max-w-xs px-8">
                  <p className="text-base font-semibold text-muted-foreground">Enjoy the 14 day trial!</p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-5xl font-bold tracking-tight">${paymentFrequency === 'monthly' ? '5' : '50'}</span>
                    <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">USD</span>
                  </p>
                  <Button asChild className="mt-10 w-full">
                    <Link to="/login">
                      Get started
                    </Link>
                  </Button>
                  <p className="mt-6 text-xs leading-5 text-muted-foreground">
                    Invoices and receipts available for easy company reimbursement
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
