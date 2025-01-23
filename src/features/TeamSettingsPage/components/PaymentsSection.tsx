import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Payment } from '../types';

interface PaymentsSectionProps {
  payments: Payment[];
}

export function PaymentsSection({ payments }: PaymentsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
        <CardDescription>
          View your payment history and download invoices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Invoice</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments?.length ? (
              payments.map((payment) => (
                <TableRow key={payment.invoice_link}>
                  <TableCell>
                    {format(payment.paid_at, 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>{payment.description}</TableCell>
                  <TableCell>€{payment.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        payment.status === 'PAID'
                          ? 'default'
                          : payment.status === 'ACTIVE'
                          ? 'secondary'
                          : 'destructive'
                      }
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {payment.invoice_link && payment.status === 'PAID' ? (
                      <a
                        href={payment.invoice_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Access Invoice
                      </a>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No payment history available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 