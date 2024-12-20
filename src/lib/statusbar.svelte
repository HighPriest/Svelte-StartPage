<script lang="ts" module>
let d = $state(new Date());
    
export function updateTime() {
    d = new Date();
}
</script>

<div class="time box">
    <div class="time-text">{d.getHours().toString().padStart(2, '0')}:{d.getMinutes().toString().padStart(2, '0')}</div>
    <div class="seconds" style:width={(d.getSeconds() / 60) * 100 + '%'} />
</div>
<div class="date box">
    <div class="month-day">
        <div class="day">{d.toLocaleString('default', { weekday: 'long' }).toLowerCase()}</div>
        <div class="month">{d.toLocaleString('default', { month: 'long' }).toLowerCase()}</div>
    </div>
    <div class="date-number">{d.toLocaleString('default', {day: 'numeric'})}</div>
</div>

<style>
    .time {
        display: flex;
        flex-direction: column;
        padding: 0 40px;
        box-shadow: 0px 0px 20px 0px var(--background-1);
    }

    .time-text {
        font-size: 2.8em;
        font-weight: 300;
        line-height: 48px;
    }

    .seconds {
        align-self: flex-start;
        width: 0%;
        height: 1.5px;
        background-color: var(--font-color);
        transition: width 0.2s ease;
    }

    .date {
        display: flex;
        padding: 0 40px;
        box-shadow: 0px 0px 20px 0px var(--background-1);
    }

    .month-day {
        font-size: 1.4em;
    }

    .date-number {
        font-size: 2.8em;
        font-weight: 300;
        margin-left: 30px;
    }
</style>

<!--<div>Time: {d.getHours().toString().padStart(2, '0')} : {d.getMinutes().toString().padStart(2, '0')} : {d.getSeconds().toString().padStart(2, '0')}</div>
<div>{d.toLocaleString('default', { weekday: 'long' }).toLowerCase()}</div>
<div>{d.toLocaleString('default', { month: 'long' }).toLowerCase()}</div>-->