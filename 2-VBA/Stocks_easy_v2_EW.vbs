Sub Stocks_easy()

'define variables
Dim shSol As Worksheet
Dim shCur as Worksheet

Dim i As Double
Dim volume As Double
Dim TotalRows as double
Dim rngTop as double
Dim rngBot as double
Dim TickerLocation as double

Dim s As Integer

Dim ticker As String
Dim prevticker as String

Dim sumavailable as boolean

'create solution sheet
ActiveWorkbook.Sheets.Add(After:=Sheets(Sheets.Count)).Name = "Solution"

'set variables
Set shSol = ActiveWorkbook.Sheets("Solution")
TickerLocation = 2
Cells(1,1).Value = "Ticker"
Cells(1,2).Value = "Volume"
Cells(1,3).Value = "Year"

'loop through all sheets
For s = 1 To ActiveWorkbook.Sheets.Count - 1

    'activate next sheet
    Sheets(s).Activate
    Set shCur = ActiveSheet

    'find total rows in sheet
    TotalRows = Cells(Rows.Count, "A").End(xlUp).Row

    'set base values for a few variables
    rngTop = 2
    prevticker = Cells(2,1).Value
    sumavailable = False

    'loop through all rows in active sheet
    For i = 2 To TotalRows
        'yield to OS
        DoEvents

        'go to current data sheet
        shCur.Activate

        'get ticker
        ticker = Cells(i, 1).Value

        'check for the end of current ticker range
        If ticker <> prevticker Then
            'set bottom of current ticker range
            rngBot = i - 1
            'sum ticker volume
            volume = Application.Sum(Range(Cells(rngTop,7),Cells(rngBot,7)))
            'prepare for next range of ticker
            rngTop = i
            'set boolean to move to solution sheet
            sumavailable = true
        End If

        'Place data on solution sheet
        If sumavailable = true Then
            sumavailable = False
            'activate solution sheet
            shSol.Activate
            'enter data
            Cells(TickerLocation,1).Value = prevticker
            Cells(TickerLocation,2).Value = volume
            Cells(TickerLocation,3).Value = 2017 - s
            TickerLocation = TickerLocation + 1
        End If

        'shift down a row
        prevticker = ticker

    Next i
Next s
End Sub