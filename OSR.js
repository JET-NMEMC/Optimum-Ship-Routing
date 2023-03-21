function predict(t) {
    //定义分潮振幅和迟角（单位：米和度）
    var O1_amp = 0.21;
    var O1_pha = 293;
    var K1_amp = 0.27;
    var K1_pha = 356;
    var M2_amp = 1.25;
    var M2_pha = 136;
    var S2_amp = 0.40;
    var S2_pha = 183;

    //定义分潮圆频率（单位：度/小时）
    var O1_freq = 13.9430356;
    var K1_freq = 15.0410686;
    var M2_freq = 28.9841042;
    var S2_freq = 30;

    //定义平均海平面（单位：米）
    var S0 = 0;
    //定义时间（单位：小时）
    // var t = [60023.66666666667];

    //定义潮位高度数组（单位：米）
    var Z = [];

    // h = Ho + Sum {ƒH cos [at + (Vo+u) - K]}
    // 其中，h是任意时间t的潮高，Ho是平均海面高度，ƒH是各个分潮的振幅，a是时间变量，Vo和u是天体参数，K是各个分潮的相位。
    // Vo和u是天体参数，它们表示月球和太阳的位置对潮汐的影响。Vo是月球或太阳的平均角度，u是月球或太阳的轨道偏心率1。它们随着时间变化。
    //计算潮位高度
    for (let i = 0; i < t.length; i++) {
        //将迟角转换为弧度
        var O1_rad = O1_pha * Math.PI / 180;
        var K1_rad = K1_pha * Math.PI / 180;
        var M2_rad = M2_pha * Math.PI / 180;
        var S2_rad = S2_pha * Math.PI / 180;

        //计算各分潮的贡献
        var O1_contribution = O1_amp * Math.cos(O1_freq * t[i] - O1_rad);
        var K1_contribution = K1_amp * Math.cos(K1_freq * t[i] - K1_rad);
        var M2_contribution = M2_amp * Math.cos(M2_freq * t[i] - M2_rad);
        var S2_contribution = S2_amp * Math.cos(S2_freq * t[i] - S2_rad);
        //计算总的潮位高度
        Z[i] = S0 + O1_contribution + K1_contribution + M2_contribution + S2_contribution;
    }
    //输出结果
    console.log(Z);
}

function JDtime(date) {
    //1998.10.15 00:00:00的MJD = 51101.0
    // let date = new Date('2023-03-21 00:00:00'); //创建一个Date对象1998-10-15 00:00  1900-01-01 08:06:00  '1858-11-17 08:05:00'
    // console.log(date)
    let timestamp = date.getTime(); //返回毫秒数
    let days = timestamp / 86400000; //返回以1970年为基准的日期
    // let result = days + 25567; //返回以1900年为基准的日期
    let result = days + 25567 + 15020; //返回以1858-11-17为基准的日期
    // console.log(result); //输出结果：44317
    return result
}


// predict(Gentimes())

function Gentimes() {
    // 创建起始时间和结束时间
    let startTime = new Date("2023-03-21T00:00:00");
    let endTime = new Date("2023-03-22T00:00:00");
    // 计算步长数
    let step = 60; // 分钟
    let length = (endTime - startTime) / (step * 60 * 1000);
    // 创建空数组并赋值
    let timeSeries = Array.from({ length: length }, (x, i) => {
        let date = new Date(startTime); // 复制起始时间
        date.setMinutes(date.getMinutes() + i * step); // 增加对应的分钟数
        // return date; // 返回日期对象
        return JDtime(date); // 返回朱利安日期对象
    });
    // 打印结果
    console.log(timeSeries);
    return timeSeries
}
