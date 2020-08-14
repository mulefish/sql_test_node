


--1 DB ACTUAL RECORD FOLLOWS 
source:something_ok
userRole:Member
invoiceId:23816839
billFromDt:1137353619
billThruDt:1859600662
insertDtTm:1444754084.067704
updateDtTm:1470307956.0863814
amountToPay:824
invoiceType:Premium
apoIndicator:No
getContractId:H2342662
pymtReceivedDt:1155301004
externalPaymentId:2019439243233
paymentMethodType:BANK_ACCOUNT
enrollmentSourceSystem:RBMS
lastSuccessfulProcessedDt:1879875125
systemStatus:{"changedBy":"Some Team","timeStamp":1818695720.487895,"statusCode":"S03","statusDescription":"Paid"}
customerStatus:{"changedBy":"Some Team","timeStamp":1594339097.426176,"statusCode":"C01","statusDescription":"Paid"}
systemStatuses:[{"changedBy":"Some Team","timeStamp":1080271647.6786857,"statusCode":"SF08","statusDescription":"Paid"},{"changedBy":"Some Team","timeStamp":1549942563.098959,"statusCode":"SF08","statusDescription":"Paid"},{"changedBy":"Some Team","timeStamp":1086954771.1541944,"statusCode":"S03","statusDescription":"Paid"},{"changedBy":"Some Team","timeStamp":1579808180.0453453,"statusCode":"S02","statusDescription":"Paid"},{"changedBy":"Some Team","timeStamp":1843980384.8709338,"statusCode":"S02","statusDescription":"Paid"},{"changedBy":"Some Team","timeStamp":1506770381.2812824,"statusCode":"S02","statusDescription":"Paid"}]
customerStatuses:[{"changedBy":"Some Team","timeStamp":1876599087.0286307,"statusCode":"C02","statusDescription":"Paid"},{"changedBy":"Some Team","timeStamp":1630154569.4686813,"statusCode":"C02","statusDescription":"Paid"},{"changedBy":"Some Team","timeStamp":1559131682.453948,"statusCode":"C01","statusDescription":"Paid"},{"changedBy":"Some Team","timeStamp":1655914198.4193964,"statusCode":"C03","statusDescription":"Paid"},{"changedBy":"Some Team","timeStamp":1375459481.756434,"statusCode":"C04","statusDescription":"Paid"},{"changedBy":"Some Team","timeStamp":1253303455.9750552,"statusCode":"C01","statusDescription":"Paid"}]


-- 1 Same record but edit down to just stuff the currently matters 
source:something_ok
insertDtTm:1444754084.067704
systemStatuses:[{"changedBy":"Some Team","timeStamp":1234,"statusCode":"SF08","statusDescription":"Paid"},{"changedBy":"Some Team","timeStamp":5678,"statusCode":"SF08","statusDescription":"Paid"}]




-- successful
select pdoc, x.elem from dummy_payments2 t
cross join lateral (
    select elem
    from jsonb_array_elements(t.pdoc #> '{systemStatuses}') a(elem)
        where a.elem #>> '{timeStamp}' <= '2000000000'
        and a.elem #>> '{statusCode}' IN ('C01', 'S03') order by a.elem #>> '{timeStamp}' LIMIT 1 
    )x
    where ( pdoc #>> '{insertDtTm}')::double precision BETWEEN '1000000000' and '2000000000'
        and x.elem #>> '{statusCode}' != 'never find me'
        and ( pdoc #>> '{source}' not in ('nope')
)

