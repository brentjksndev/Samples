<?php
function archive_custom() {
    global $wpdb, $wp_locale;
    $query = "SELECT YEAR(post_date) AS `year`, MONTH(post_date) AS `month`, count(ID) as posts FROM $wpdb->posts WHERE post_type = 'post' AND post_status = 'publish' GROUP BY YEAR(post_date), MONTH(post_date) ORDER BY post_date DESC";
    $arcresults = $wpdb->get_results($query);
    if ( $arcresults ) {
        $year = null;
        foreach ( (array) $arcresults as $arcresult ) {
            if($arcresult->year != $year) {
                echo $arcresult->year;
                $year = $arcresult->year;
            }
            $url = get_month_link( $arcresult->year, $arcresult->month );
            $text = sprintf(__('%1$s %2$d'), $wp_locale->get_month($arcresult->month), $arcresult->year);
            $after = '&nbsp;('.$arcresult->posts.')';
            echo '<a href="'.$url.'>'.$text.$after.'</a>';
        }
    }
}
?>