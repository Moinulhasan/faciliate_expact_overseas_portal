@php($types = ['job' => 'Job seeker', 'employer' => 'Employer', 'other' => 'General'])
<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:24px;background:#f6f8f5;font-family:Arial,Helvetica,sans-serif;color:#0b1a12;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #dce6da;border-radius:16px;">
    <tr>
      <td style="background:#06120d;color:#eef5f0;padding:20px 24px;border-radius:16px 16px 0 0;">
        <div style="font-size:12px;color:#a9bdb1;">Website inquiry · {{ $types[$inquiry->type] }}</div>
        <div style="font-size:20px;font-weight:bold;margin-top:4px;">{{ $inquiry->name }}</div>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 24px;font-size:14px;line-height:22px;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin-bottom:16px;">
          <tr><td style="color:#57695f;width:110px;padding:3px 0;">Email</td><td><a href="mailto:{{ $inquiry->email }}" style="color:#1c7949;">{{ $inquiry->email }}</a></td></tr>
          @if($inquiry->phone)
          <tr><td style="color:#57695f;padding:3px 0;">Phone</td><td><a href="tel:{{ preg_replace('/[^0-9+]/', '', $inquiry->phone) }}" style="color:#1c7949;">{{ $inquiry->phone }}</a></td></tr>
          @endif
          @if($inquiry->company)
          <tr><td style="color:#57695f;padding:3px 0;">Company</td><td>{{ $inquiry->company }}</td></tr>
          @endif
          <tr><td style="color:#57695f;padding:3px 0;">Sent from</td><td>{{ $inquiry->page ?: '—' }}</td></tr>
          <tr><td style="color:#57695f;padding:3px 0;">Received</td><td>{{ $inquiry->created_at->timezone('Asia/Dhaka')->format('j M Y, H:i') }} (Dhaka)</td></tr>
        </table>
        <div style="background:#edf3ec;border-radius:12px;padding:14px 16px;white-space:pre-line;">{{ $inquiry->message }}</div>
        <p style="font-size:12px;color:#57695f;margin:16px 0 0;">Reply to this email to answer {{ $inquiry->name }} directly. Ref #{{ $inquiry->id }}</p>
      </td>
    </tr>
  </table>
</body>
</html>
