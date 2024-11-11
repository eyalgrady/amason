import { Checkbox, Typography, FormControlLabel, Paper } from "@mui/material";

import FormWrapper from "../../components/FormWrapper";

export default function ThirdStep({ isChecked, inputChange }) {
  return (
    <FormWrapper title={"Terms and Conditions"}>
      <Paper
        sx={{
          height: 300,
          overflowY: "auto",
          padding: 2,
          border: "1px solid #ccc",
          marginBottom: 2,
        }}
      >
        <Typography variant="body2">
          These Terms and Conditions ("Terms") govern your use of [Platform
          Name] (the "Platform"), which enables business users ("Sellers") to
          create virtual stores and sell products directly to consumers. By
          accessing or using the Platform, you agree to comply with and be bound
          by these Terms. Please read them carefully.
          <br />
          <br />
          <strong>1. User Eligibility</strong>
          <br />
          You must be a registered business entity or individual conducting
          commercial activities to create a store on the Platform. By signing
          up, you confirm that you have the legal authority to sell products and
          conduct transactions in compliance with local laws and regulations.
          <br />
          <br />
          <strong>2. Store Creation and Management</strong>
          <br />
          As a Seller, you are responsible for setting up and managing your
          virtual store, including listing products, managing inventory, setting
          prices, and fulfilling orders. All information provided in your store
          must be accurate, up-to-date, and not misleading. The Platform
          reserves the right to review and approve or deny any store or product
          listings.
          <br />
          <br />
          <strong>3. Product Listings</strong>
          <br />
          Sellers are solely responsible for the content, accuracy, and legality
          of their product listings. By listing a product on the Platform, you
          represent and warrant that you have the legal right to sell that
          product, and that the product complies with all applicable laws,
          including but not limited to consumer protection, intellectual
          property, and safety regulations.
          <br />
          <br />
          <strong>4. Payments and Fees</strong>
          <br />
          The Platform may charge transaction fees, subscription fees, or other
          applicable service fees, which will be clearly communicated to Sellers
          before charges are applied. Sellers are responsible for any fees
          associated with the payment gateways used for processing transactions.
          The Platform will not be liable for any fees, taxes, or other charges
          related to your use of the service.
          <br />
          <br />
          <strong>5. Order Fulfillment</strong>
          <br />
          Sellers are responsible for processing and fulfilling customer orders
          in a timely manner. You agree to deliver products as described and in
          good condition. In the event of any dispute or return, you are
          responsible for resolving the issue directly with the customer,
          following applicable consumer laws and the Platform's return policy
          guidelines.
          <br />
          <br />
          <strong>6. Prohibited Products</strong>
          <br />
          You may not list or sell any products that are illegal, harmful, or
          violate the intellectual property rights of others. This includes
          counterfeit goods, hazardous materials, stolen property, or items that
          infringe on any trademarks, patents, or copyrights. The Platform
          reserves the right to remove any prohibited products or suspend Seller
          accounts without prior notice.
          <br />
          <br />
          <strong>7. Intellectual Property</strong>
          <br />
          All content and materials provided by the Platform, including logos,
          designs, text, and images, are the intellectual property of the
          Platform or its licensors. Sellers may not use or reproduce this
          content without express written permission. Similarly, you retain
          ownership of your own store content, but grant the Platform a
          non-exclusive, royalty-free license to use, display, and promote your
          store and products on the Platform.
          <br />
          <br />
          <strong>8. Limitation of Liability</strong>
          <br />
          The Platform is provided "as is," and we make no guarantees regarding
          the performance or availability of the service. We are not responsible
          for any loss, damage, or liability arising from the use of the
          Platform, including but not limited to interruptions, data loss, or
          unauthorized access to your account.
          <br />
          <br />
          <strong>9. Termination</strong>
          <br />
          The Platform reserves the right to terminate or suspend any Seller
          account at its discretion, including but not limited to cases of
          violation of these Terms, fraudulent activities, or inappropriate
          conduct. Sellers may also terminate their account at any time, but
          must fulfill any outstanding orders before doing so.
          <br />
          <br />
          <strong>10. Amendments</strong>
          <br />
          The Platform reserves the right to update or modify these Terms at any
          time. Changes will be communicated via email or through notifications
          on the Platform. Your continued use of the Platform after any such
          changes constitutes acceptance of the new Terms.
          <br />
          <br />
          <strong>11. Governing Law</strong>
          <br />
          These Terms and any disputes related to the Platform are governed by
          the laws of [Your Jurisdiction]. You agree to submit to the exclusive
          jurisdiction of the courts of [Your Jurisdiction] for the resolution
          of any disputes.
          <br />
          <br />
          By using the Platform, you agree to these Terms and Conditions. If you
          do not agree, you must discontinue use of the Platform immediately.
        </Typography>
      </Paper>

      <FormControlLabel
        control={<Checkbox checked={isChecked} onChange={inputChange} />}
        label="I have read and agree to the Terms and Conditions"
      />
    </FormWrapper>
  );
}
