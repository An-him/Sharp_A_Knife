import requests

class MpesaPayment:
    @staticmethod
    def initiate_payment(amount, phone_number, account_reference):
        url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        headers = {
            "Authorization": "Bearer ACCESS_TOKEN",
            "Content-Type": "application/json"
        }
        payload = {
            "BusinessShortCode": "123456",
            "Password": "PASSWORD",
            "Timestamp": "TIMESTAMP",
            "TransactionType": "CustomerPayBillOnline",
            "Amount": amount,
            "PartyA": phone_number,
            "PartyB": "123456",
            "PhoneNumber": phone_number,
            "CallBackURL": "https://example.com/callback",
            "AccountReference": account_reference,
            "TransactionDesc": "Payment Description"
        }
        response = requests.post(url, json=payload, headers=headers)
        return response.json()
