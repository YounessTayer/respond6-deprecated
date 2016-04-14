<?php

namespace App\Respond\Libraries;

class Components
{

  /**
   * Generates HTML for <respond-menu type="menu-type"></respond-menu>
   *
   * @param {array} $attrs
   * @param {string} $siteId
   */
  public static function respondMenu($type, $cssClass, $pageUrl, $siteId) {

    // set html extension
    $ext = '.html';

    if (env('FRIENDLY_URLS') === true) {
        $ext = '';
    }

    // get json for menu
    $file = app()->basePath() . '/public/sites/' . $siteId . '/data/menus/' . $type . '.json';

    $menu = '';

    if (file_exists($file)) {

        // init menu
        $menu = '<ul';

        // set class if applicable
        if ($cssClass != '') {
            $menu .= ' class="' . $cssClass . '" respond-menu type="' . $type . '">';
        } else {
            $menu .= ' respond-menu type="' . $type . '">';
        }

        // get items for type
        $json = json_decode(file_get_contents($file), true);

        // get items
        $menuItems = $json['items'];

        $i = 0;
        $parent_flag = false;
        $new_parent = true;

        // walk through items
        foreach ($menuItems as $menuItem) {

            $html = $menuItem['html'];
            $cssClass = $menuItem['cssClass'];
            $url = $menuItem['url'];
            $isNested = $menuItem['isNested'];

            // set active
            if ($pageUrl === $url) {
                $cssClass .= ' active';
            }

            // check for new parent
            if (isset($arr[$i + 1])) {
                if ($menuItems[$i + 1]['isNested'] == true && $new_parent == true) {
                    $parent_flag = true;
                }
            }

            $menu_root = '/';

            // check for external links
            if (strpos($url, 'http') !== false) {
                $menu_root = '';
            }

            if ($new_parent == true && $parent_flag == true) {
                $menu .= '<li class="dropdown">';
                $menu .= '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">' . $menuItem['html'] . ' <span class="caret"></span></a>';
                $menu .= '<ul class="dropdown-menu">';
                $new_parent = false;
            } else {
                $menu .= '<li' . $cssClass . '>';
                $menu .= '<a href="' . $url . $ext . '">' . $menuItem['html'] . '</a>';
                $menu .= '</li>';
            }

            // end parent
            if (isset($menuItems[$i + 1])) {
                if ($menuItems[$i + 1]['isNested'] == false && $parent_flag == true) {
                    $menu .= '</ul></li>'; // end parent if next item is not nested
                    $parent_flag = false;
                    $new_parent = true;
                }
            } else {
                if ($parent_flag == true) {
                    $menu .= '</ul></li>'; // end parent if next menu item is null
                    $parent_flag = false;
                    $new_parent = true;
                }
            }

            $i = $i + 1;
        }

        $menu .= '</ul>';

      }

      return $menu;

  }

  /**
   * Generates HTML for <respond-content url="page/test"></respond-content>
   *
   * @param {array} $attrs
   * @param {string} $siteId
   */
  public static function respondContent($url, $siteId) {

    // replace the / with a period
    $url = str_replace('/', '.', $url);
    $url .= '.html';

    // default is blank
    $html = '';

    // get location of content html
    $dest = app()->basePath() . '/public/sites/' . $siteId;
    $content_dest = $dest . '/fragments/page/' . $url;

    // get contents
    if (file_exists($content_dest)) {
        $html = file_get_contents($content_dest);
    }

    return $html;

  }


}