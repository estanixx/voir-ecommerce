"use client"
import * as React from "react"
import { format, getDate, getMonth, getYear, setDate, setMonth, setYear } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

interface DatePickerProps {
  startYear?: number
  endYear?: number
  className?: string
  value?: Date
  onChange?: (date: Date) => void
}

export function DatePicker({
  startYear = getYear(new Date()) - 100,
  endYear = getYear(new Date()),
  className,
  value,
  onChange,
}: DatePickerProps) {
  const initialDate = value || new Date()
  const [date, setDate] = React.useState<Date>(initialDate)
  const [isOpen, setIsOpen] = React.useState(false)
  const [dayValue, setDayValue] = React.useState(getDate(initialDate).toString().padStart(2, '0'))
  const [monthValue, setMonthValue] = React.useState((getMonth(initialDate) + 1).toString().padStart(2, '0'))
  const [yearValue, setYearValue] = React.useState(getYear(initialDate).toString())

  const updateDateFromInputs = (day: string, month: string, year: string) => {
    let monthNum = parseInt(month) || 1
    // Ensure month is between 1-12
    monthNum = Math.max(1, Math.min(12, monthNum))
    const monthStr = monthNum.toString().padStart(2, '0')

    const yearNum = parseInt(year) || getYear(new Date())
    const dayNum = parseInt(day) || 1
    
    // Validate day based on month and year
    const daysInMonth = new Date(yearNum, monthNum, 0).getDate()
    const validDay = Math.max(1, Math.min(dayNum, daysInMonth))
    const dayStr = validDay.toString().padStart(2, '0')
    
    const newDate = new Date(yearNum, monthNum - 1, validDay)
    setDate(newDate)
    onChange?.(newDate)
    
    // Update the input values with validated numbers
    setDayValue(dayStr)
    setMonthValue(monthStr)
    setYearValue(yearNum.toString())
  }

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    setDayValue(value)
    if (value.length === 2) {
      updateDateFromInputs(value, monthValue, yearValue)
    }
  }

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    // Prevent values greater than 12
    if (value && parseInt(value) > 12) {
      setMonthValue('12')
      updateDateFromInputs(dayValue, '12', yearValue)
    } else {
      setMonthValue(value)
      if (value.length === 2) {
        updateDateFromInputs(dayValue, value, yearValue)
      }
    }
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    setYearValue(value)
    if (value.length === 4) {
      updateDateFromInputs(dayValue, monthValue, value)
    }
  }

  const handleBlur = () => {
    updateDateFromInputs(dayValue, monthValue, yearValue)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[200px] justify-start text-left font-normal h-9 text-sm text-black",
            !date && "text-muted-foreground",
            className
          )}
        >
          {format(date, "dd/MM/yyyy")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="start">
        <div className="flex items-center gap-1">
          <Input
            type="text"
            value={dayValue}
            onChange={handleDayChange}
            onBlur={handleBlur}
            placeholder="DD"
            className="w-12 text-center text-sm"
            maxLength={2}
          />
          <span>/</span>
          <Input
            type="text"
            value={monthValue}
            onChange={handleMonthChange}
            onBlur={handleBlur}
            placeholder="MM"
            className="w-12 text-center text-sm"
            maxLength={2}
          />
          <span>/</span>
          <Input
            type="text"
            value={yearValue}
            onChange={handleYearChange}
            onBlur={handleBlur}
            placeholder="AAAA"
            className="w-16 text-center text-sm"
            maxLength={4}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}