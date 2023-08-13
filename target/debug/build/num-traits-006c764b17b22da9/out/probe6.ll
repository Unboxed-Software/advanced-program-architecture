; ModuleID = 'probe6.564ff6d072b6286e-cgu.0'
source_filename = "probe6.564ff6d072b6286e-cgu.0"
target datalayout = "e-m:o-i64:64-i128:128-n32:64-S128"
target triple = "arm64-apple-macosx11.0.0"

; core::f64::<impl f64>::is_subnormal
; Function Attrs: inlinehint uwtable
define internal zeroext i1 @"_ZN4core3f6421_$LT$impl$u20$f64$GT$12is_subnormal17hf07538efb01b3ca9E"(double %self) unnamed_addr #0 {
start:
  %_2 = alloca i8, align 1
  %0 = alloca i8, align 1
; call core::f64::<impl f64>::classify
  %1 = call i8 @"_ZN4core3f6421_$LT$impl$u20$f64$GT$8classify17h4f6a6d316fcebeacE"(double %self), !range !1
  store i8 %1, ptr %_2, align 1
  %2 = load i8, ptr %_2, align 1, !range !1, !noundef !2
  %_3 = zext i8 %2 to i64
  %3 = icmp eq i64 %_3, 3
  br i1 %3, label %bb3, label %bb2

bb3:                                              ; preds = %start
  store i8 1, ptr %0, align 1
  br label %bb4

bb2:                                              ; preds = %start
  store i8 0, ptr %0, align 1
  br label %bb4

bb4:                                              ; preds = %bb3, %bb2
  %4 = load i8, ptr %0, align 1, !range !3, !noundef !2
  %5 = trunc i8 %4 to i1
  ret i1 %5
}

; probe6::probe
; Function Attrs: uwtable
define void @_ZN6probe65probe17h9742d3e1d4d112bcE() unnamed_addr #1 {
start:
; call core::f64::<impl f64>::is_subnormal
  %_1 = call zeroext i1 @"_ZN4core3f6421_$LT$impl$u20$f64$GT$12is_subnormal17hf07538efb01b3ca9E"(double 1.000000e+00)
  ret void
}

; core::f64::<impl f64>::classify
; Function Attrs: uwtable
declare i8 @"_ZN4core3f6421_$LT$impl$u20$f64$GT$8classify17h4f6a6d316fcebeacE"(double) unnamed_addr #1

attributes #0 = { inlinehint uwtable "frame-pointer"="non-leaf" "target-cpu"="apple-m1" }
attributes #1 = { uwtable "frame-pointer"="non-leaf" "target-cpu"="apple-m1" }

!llvm.module.flags = !{!0}

!0 = !{i32 8, !"PIC Level", i32 2}
!1 = !{i8 0, i8 5}
!2 = !{}
!3 = !{i8 0, i8 2}
